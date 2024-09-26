const product = require("../data/product");

const getallproducts =async (req,resp)=>{

  const {author ,title ,isbn , reviewId, bookId}=req.query;
  const queryObject={};
  if(author){
    queryObject.author={$regex: author, $options: 'i' };
  }
  if(title){
    queryObject.title={$regex: title, $options: 'i' };
  }
  if(isbn){
    queryObject.isbn=isbn;
  }
  try {
    // Fetch products based on the queryObject
    const mydata = await product.find(queryObject);

    if (bookId && reviewId) {
      // If both bookId and reviewId are provided, fetch the specific review
      const book = await product.findById(bookId); // Find the book by its ID

      if (book) {
        const review = book.reviews.id(reviewId); // Find the review by its ID

        if (review) {
          return resp.status(200).json({ review }); // Return the specific review
        } else {
          return resp.status(404).json({ message: 'Review not found' });
        }
      } else {
        return resp.status(404).json({ message: 'Book not found' });
      }
    } else {
      // If no specific review is being fetched, return the found products (books)
      return resp.status(200).json({ mydata });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
};


const reviewadd =async (req, res) => {
    const {bookId} = req.query;
    const { reviewerName, rating, comment } = req.body;
    console.log(bookId);
    try {
        const book = await product.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
     
      // Add the new review to the reviews array
      book.reviews.push({ reviewerName, rating, comment });
      await book.save();
      
      res.status(201).json({ message: 'Review added', book });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  const reviewupdate =async (req, res) => {
    const { bookId, reviewId } = req.query;
    const { reviewerName, rating, comment } = req.body;
    console.log(bookId);
  
    try {
      const book = await product.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Find the review to update
      const review = book.reviews.id(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Update the review fields
      if (reviewerName) review.reviewerName = reviewerName;
      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
  
      await book.save();
  
      res.status(200).json({ message: 'Review updated', book });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  const reviewdelete=async (req, res) => {
    const { isbn, reviewId } = req.query;
  
    try {
      // Find the book by ISBN
      const Product = await product.findOne({ isbn: isbn });
  
      if (!Product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Filter out the review to be deleted
      const updatedReviews = Product.reviews.filter(
        (review) => review._id.toString()!== reviewId
      );
  
      // Update the product's reviews
      Product.reviews = updatedReviews;
      await Product.save();
  
      res.json({ message: 'Review deleted successfully', product });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error : err.message});
    }
  };

  const searchisbn= (req, res) => {
    const { isbn } = req.query; // Get ISBN from query parameters
  
    if (!isbn) {
      return res.status(400).json({ message: 'Please provide an ISBN.' }); // Return an error if no ISBN is provided
    }
  
    product.findOne({ isbn }) // Find the book by ISBN (returns a promise)
      .then(book => {
        if (book) {
          res.status(200).json(book); // Return the book if found
        } else {
          res.status(404).json({ message: 'Book not found' }); // Return 404 if the book is not found
        }
      })
      .catch(error => {
        console.error('Error searching for book by ISBN:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle any errors during the process
      });
  };

module.exports={getallproducts,reviewadd,reviewupdate, reviewdelete , searchisbn};