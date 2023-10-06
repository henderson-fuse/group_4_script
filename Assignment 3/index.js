const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");

const index = express();
index.use(express.urlencoded({extended: true}));
index.set("view engine", "ejs");
index.use(express.static("public"));


const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "sales",
  password: "",
});



index.get("/", (req, res) => {
  // Count the number of products
  const productQuery = "SELECT COUNT(product_id) AS productCount FROM product";
  connection.query(productQuery, (productErr, productCount) => {
    if (productErr) {
      console.error(productErr);
      return res.status(500).send("Error counting products");
    }

    // Count the total sales
    const salesQuery = "SELECT COUNT(sale_id) AS saleCount FROM sale";
    connection.query(salesQuery, (salesErr, saleCount) => {
      if (salesErr) {
        console.error(salesErr);
        return res.status(500).send("Error counting sales");
      }

      // Calculate the total sum of total_price
      const totalSalesQuery = "SELECT SUM((s.product_quantity * p.productprice)) AS totalSales FROM sale AS s JOIN product AS p ON s.product_id = p.product_id";
      connection.query(totalSalesQuery, (totalSalesErr, totalSales) => {
        if (totalSalesErr) {
          console.error(totalSalesErr);
          return res.status(500).send("Error calculating total sales");
        }

        // Fetch sales data
        const salesDataQuery = "SELECT s.sale_id, p.productname AS product_name, s.product_quantity, (s.product_quantity * p.productprice) AS total_price FROM sale AS s JOIN product AS p ON s.product_id = p.product_id ORDER BY sale_id DESC LIMIT 3"; 
        connection.query(salesDataQuery, (salesDataErr, salesData) => {
          if (salesDataErr) {
            console.error(salesDataErr);
            return res.status(500).send("Error fetching sales data");
          }

          const recentProducts = "SELECT * FROM product ORDER BY product_id DESC LIMIT 3"; 
          connection.query(recentProducts, (error, products) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Error fetching product data");
            }

             // Prepare data with all counts, total sales, and sales data
            const data = {
              title: "Dashboard",
              active: "Dashboard",
              productCount: productCount[0].productCount,
              saleCount: saleCount[0].saleCount,
              totalSales: totalSales[0].totalSales || 0, // Use 0 if there are no sales
              salesData: salesData, // Add sales data to the data object
              products: products
            };

            res.render("dashboard", data);
          });          
        });
      });
    });
  });
});




index.get('/list', (req, res) => {
  const productId = req.params.id;
  const query = `SELECT * FROM product`;
  connection.query(query, (error, product) => {
    if (error) {
      console.error('Error fetching data from MySQL: ', error);
      return res.status(500).send(`Error fetching data from MySQL ${error}`);
    }

    const data = {
      title: "Total Products",
      active: "Add",
      products: product
    }
    console.log(product);
    if (product.length === 0) {
      return res.status(404).send('Record not found');
    }
    res.render('add', data);
  });
});

index.post("/post/add_product", (req, res) =>{
  connection.query("INSERT INTO product SET ?", req.body, (error, results) =>{
      if(error){
          console.log("There was an Error");
      }
      else {
        const productId = req.params.id;
        const query = `SELECT * FROM product`;
        connection.query(query, (error, product) => {
          if (error) {
            console.error('Error fetching data from MySQL: ', error);
            return res.status(500).send(`Error fetching data from MySQL ${error}`);
          }

          const data = {
            title: "Total Products",
            active: "Add",
            products: product
          }
          console.log(product);
          if (product.length === 0) {
            return res.status(404).send('Record not found');
          }
          res.render('add', data);
        });
      }
  });

  console.log(req.body.product_id);
});

index.get('/edit/:id', (req, res) => {
  const productId = req.params.id;
  const query = `SELECT * FROM product WHERE product_id = ${req.params.id}`;
  connection.query(query, [productId], (error, product) => {
    if (error) {
      console.error('Error fetching data from MySQL: ', error);
      return res.status(500).send(`Error fetching data from MySQL ${error}`);
    }

    const data = {
      title: "Update Product",
      active: "Edit",
      product: product
    }
    console.log(product);
    if (product.length === 0) {
      return res.status(404).send('Record not found');
    }
    res.render('edit', data);
  });
});

index.post('/update/:id', (req, res) => {
  if (req.body) {
      const product_id = req.params.id;
      let productname = req.body.productname; 
      let productprice = req.body.productprice; 
      let productquantity = req.body.productquantity; 
      let productdescription = req.body.productdescription;
       
      const query = `UPDATE product SET productname= "${productname}", productprice="${productprice}", productquantity="${productquantity}", productdescription="${productdescription}" WHERE product_id="${product_id}"`;
      connection.query(query, [product_id, productname, productprice, productquantity, productdescription], (error, results) => {
      if (error) {
          console.error('Error updating data in MySQL: ', error);
          return res.status(500).send('Error updating data in MySQL');
      }
      
      res.redirect("/")
      // res.redirect('/');
      });
  } else {
      res.status(400).json({ error: req.body });
  }
  
});

index.get('/delete/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM product WHERE product_id = ?';
  connection.query(query, [productId], (error, products) => {
    if (error) {
      console.error('Error fetching data from MySQL: ', error);
      return res.status(500).send('Error fetching data from MySQL');
    }
    const data = {
      title: "Delete Product",
      active: "Delete",
      pending: products[0],
    }
    res.render('delete', data);
  });
});

index.post('/delete/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM product WHERE product_id = ?';
  connection.query(query, [productId], (error, products) => {
    if (error) {
      console.error('Error deleting data from MySQL: ', error);
      return res.status(500).send('Error deleting data from MySQL');
    }
    res.redirect('/');
  });
});



index.get('/saleslist', (req, res) => {
  const salesQuery = "SELECT  p.productname AS product_name, s.product_quantity, (s.product_quantity * p.productprice) AS total_price FROM sale AS s JOIN product AS p ON s.product_id = p.product_id ORDER BY s.sale_id DESC";
  const productQuery = "SELECT productname AS product_name FROM product";
  connection.query(productQuery, (error, total) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Erro retrieving products");
    }
    connection.query(salesQuery, (error, sales) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error fetching sales data");
      };
  
      const data = {
        title: "Total Sales",
        active: "Sales",
        sales: sales,
        total: total
      }
      console.error(data.total.product_name)

  
      res.render('sales', data);
    });
  })
  
});



index.post('/add_sale', (req, res) => {
  const getProduct = "SELECT * FROM product";
  connection.query(getProduct, (error, products) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching sales data");
    };

    let productname = req.body.product_name;
    console.error(productname)
    let productquantity = req.body.productquantity; 

    for (let i = 0; i < products.length; i++) {
      if (productname === products[i].productname) {
        console.error(products[i].productname)
        if (productquantity <= products[i].productquantity) {
          let originQ = products[i].productquantity
          let newQuantity = products[i].productquantity - productquantity
          let prodID = products[i].product_id;
          console.error(newQuantity);
          const addSale = `INSERT INTO sale (product_id, product_quantity) VALUES (${prodID}, ${productquantity})`;
          connection.query(addSale, (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Error inputting data");
            }
            console.error("done")
          })
          const updateQuantity = `UPDATE product SET productquantity = ${newQuantity} WHERE product_id = ${prodID}`;
          connection.query(updateQuantity, (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Error updating data");
            }
            console.error("complete")
          })
        }
        else {
          const errInfo = {
            title: "Error",
            active: "Error",
            data: `Enter a valid quantity. You have ${products[i].productquantity} in store and you attempted to enter ${productquantity} items.`
          }

          return res.status(500).render("error", errInfo);
        }
        break
      }
    } 

    
    res.redirect('/saleslist');
  });
});

index.post("/email", (req, res) => {
  const recepient = req.body.recepient;
  const subject = req.body.subject;
  const body = req.body.body;

  smtpTransport = {
    service: "Gmail",
    auth: {
      user: "emmanuelnyalugwe19@gmail.com",
      pass: "aefm zbhk gsvt thrb"
    }
  }

  let trans = nodemailer.createTransport(smtpTransport);

  let mess = {
    from: "emmanuelnyalugwe19@gmail.com",
    to: recepient,
    subject: subject,
    text: body
  }

  trans.sendMail(mess, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      return res.redirect("/");
    }
  });
});

index.get("/reportslist", (req, res) => {
  const getSales = "SELECT p.productname AS product, SUM(s.product_quantity) AS sold, SUM(s.product_quantity * p.productprice) AS price FROM sale s INNER JOIN product p ON s.product_id = p.product_id GROUP BY p.productname";
  connection.query(getSales, (error, sales) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error retrieving sales");
    }
    const data = {
      title: "Reports",
      active: "Reports",
      sales: sales,
    }
    console.error(sales[0].product);
    res.render("reports", data);
  });
})

index.get("/add", (req, res) => {
  const data = {
    title: "Add product",
    active: "Add",
  };
  res.render("add", data);
});

index.get("/sales", (req, res) => {
  const data = {
    title: "Total Sales",
    active: "Sales",
  };
  res.render("sales", data);
});

index.get("/edit", (req, res) => {
  const data = {
    title: "Update Product",
    active: "Edit",
  };
  res.render("edit", data);
});

index.get("/delete", (req, res) => {
  const data = {
    title: "Delete Product",
    active: "Delete",
  };
  res.render("delete", data);
});



index.get("/reports", (req, res) => {
    const data = {
      title: "Reports",
      active: "Reports",
    };
    res.render("reports", data);
});

index.listen(3000, () => {
  console.log("server started");
});


