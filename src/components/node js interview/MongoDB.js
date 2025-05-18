// ! What is MongoDB

// ** MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON (Binary JSON). Unlike traditional relational databases, MongoDB does not use tables and rows but instead organizes data into collections and documents. Each document can store different fields, making it highly scalable, flexible, and performant.

//! Why is MongoDB Used in the MERN Stack?

// ** JSON-Like Documents – Since MongoDB stores data in BSON (Binary JSON) format, it integrates seamlessly with JavaScript and Node.js, which use JSON.

// ** Scalability – MongoDB is horizontally scalable, meaning it can handle large amounts of data and traffic efficiently using sharding and replication.

// ** Fast Performance – Querying in MongoDB is fast due to its indexing and document-based structure, which reduces the need for complex joins.

// ! Difference Between SQL and NoSQL Databases

// * SQL (Relational Databases)

// Uses a structured schema with tables, rows, and columns.

// Fixed schema; data must follow a predefined structure.

// Scales vertically (by increasing system resources like RAM/CPU).

// Can be slower with complex queries involving multiple joins.

// Banking, financial applications, e-commerce, ERP, CRM, where consistency is critical.

// * NoSQL (Non-Relational Databases)

// Uses flexible, schema-less structures like documents, key-value pairs, graphs, or wide-column stores.

// Stores data in various formats: JSON-like documents, key-value pairs, graphs, or columns.

// Scales horizontally (by distributing data across multiple servers).

// Faster for read/write operations, especially for unstructured or semi-structured data.

// Real-time applications, big data, content management, IoT, recommendation engines, and social media platforms.

// ! Difference Between find() and findOne() in MongoDB

// ** Both find() and findOne() are used to retrieve data from a MongoDB collection, but they work differently in terms of output and behavior.

// * find()

// 	Retrieves multiple documents that match the query.

// Returns an array (which can be iterated to fetch multiple documents).

// Returns all matching documents

// Usage: When you need a list of results.

// * findOne()

// Retrieves only one document that matches the query.

// Returns a single document directly.

// Returns the first matching document found.

// Usage: When you only need one result (e.g., fetching a user by ID).
