/******************************
 *                            * 
 *  LOCAL FUNCTIONS           *
 *                            *
 * ****************************/
/**
 * FUNCTION: Get the name of a collection in lowercase
 * PARAMETERS: 1. Collection object (model in Mongoose)
 * RETURNS: String: name of a collection in lowercase
 * DEPENDENCIES: None
**/
let getCollectionName = (modelObject) => {

  return String(modelObject.modelName).toLowerCase();

};


/**
 * FUNCTION: Get the name of a collection in lowercase and plural
 * PARAMETERS: 1. Collection object (model in Mongoose)
 * RETURNS: String: name of a collection in lowercase and plural
 * DEPENDENCIES: None
**/
let getPluralCollectionName = (modelObject) => {

  let collectionName = String(modelObject.modelName).toLowerCase();
  let _collectionName = "";

  // For collections like category, the plural is different
  if ( collectionName.slice(-1) === 'y' ) { 
    _collectionName = collectionName.slice(0, collectionName.length - 1);
    _collectionName += 'ies';
  } else {
    _collectionName = collectionName + 's';
  }
  
  return _collectionName;
  
};


/******************************
 *                            * 
 *  MODEL HELPER FUNCTIONS    *
 *                            *
 * ****************************/
module.exports = {

  // Show all the documents of a collection
  showAllDocuments: (collection, req, res, next) => {

    // Retrieve all documents from collection
    collection.find({}, (err, documents) => {
      if (err) {
        return next(err);
      }

      // Display the collection
      res.render('collection/list', { documents, collectionName: getCollectionName(collection), collectionNamePlural: getPluralCollectionName(collection) });
    });
    
  },

  // Show a document from a collection
  showDocument: (collection, req, res, next) => {
    
    // Retrieve document ID from URL
    const documentID = req.params.id;
      
    // Search for the document data based on the ID
    collection.findById({ '_id': documentID }, (err, document) => { 
        if (err) {
          return next(err);
        }
        
        // Show the document data
        res.render('collection/show', { document, collectionName: getCollectionName(collection) });
    });
      
  },

  // Show the new document page
  showNewDocumentsForm: (collection, req, res, next) => {

    // Display the new document view
    res.render('collection/new', { collectionName: getCollectionName(collection), collectionNamePlural: getPluralCollectionName(collection) });

  },
  
  // Add a new document to the collection
  newDocument: (collection, req, res, next) => {

    // Retrieve document info
    const documentInfo = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    };

    // Create the new document in the db
    const newDocument = new collection(documentInfo);
    newDocument.save( (err) => {
      if (err) {
        console.log(err);
        next(err);
      } else { 
        
        // Redirect on success
        res.redirect('/admin/'+getPluralCollectionName(collection));
      }
    });

  },

  // Show document edit page 
  showEditDocumentForm: (collection, req, res, next) => {

    // Retrieve document ID from URL
    const documentID = req.params.id;

    // Search for the document data based on the ID
    collection.findById(documentID, (err, document) => {
      if (err) {
        return next(err);
      }
  
      // Render the edit document form
      res.render('collection/edit', { document, collectionName: getCollectionName(collection), collectionNamePlural: getPluralCollectionName(collection) });
    });
   
  },

  // Edit a document of a collection
  editDocument: (collection, req, res, next) => {

    // Retrieve document ID from URL
    const documentID = req.params.id;

    // Retrieve new document data
    const documentUpdate = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    };

    // Update the document data in the db
    collection.findByIdAndUpdate(documentID, documentUpdate, (err, document) => {
      if (err) { 
        return next(err); 
      }    
      // If the data was saved properly, then go back to the listing page
      res.redirect('/admin/'+getPluralCollectionName(collection));
    });

  },

  // Delete a document of a collection
  deleteDocument: (collection, req, res, next) => {
  
    // Retrieve document ID from URL
    const documentID = req.params.id;

    // Delete the document from the collection in db
    collection.findByIdAndRemove(documentID, (err, document) => {
      if (err) { 
        return next(err);
      }
      
      // If the document was properly deleted, then go back to the proper listing page
      res.redirect('/admin/' + getPluralCollectionName(collection));
    });

  },
}
