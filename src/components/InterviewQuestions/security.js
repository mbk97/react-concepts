//  ! WEB VULNERABILITIES

// ** 1. BROKEN ACCESS CONTROL

////  ! WEB VULNERABILITIES

// ** 1. BROKEN ACCESS CONTROL

// Broken Access Control occurs when an application does not properly restrict user access to sensitive data or functionality.
// This can be due to a variety of factors, including:
// - Inadequate authentication and authorization mechanisms
// - Poorly implemented access control lists (ACLs)
// - Insecure direct object references (IDORs)

// Example of insecure code:
// if (user.isAdmin) {
//     // allow access to sensitive data
// }

// Improved code:
// if (user.hasPermission('admin')) {
//     // allow access to sensitive data
// }

// ! 2. CRYPOGRAPHIC FAILURE

// Involves inadequate encryption of sensitive data leading to potential data exposure or compromise

// Example of a Cryptographic Failure in JavaScript (Insecure Password Storage)

// ** Bad Practice
const users = [
  { username: "admin", password: "password123" }, // 🚨 Insecure! Storing plaintext password
];

function login(username, password) {
  const user = users.find((u) => u.username === username);
  if (user && user.password === password) {
    console.log("Login successful!");
  } else {
    console.log("Invalid credentials");
  }
}

login("admin", "password123");

// ** Good practice
import bcrypt from "bcrypt";

// const users = [];

async function register(username, password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  users.push({ username, password: hashedPassword }); // ✅ Store hashed password
  console.log("User registered!");
}

async function login(username, password) {
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("Login successful!");
  } else {
    console.log("Invalid credentials");
  }
}

async function test() {
  await register("admin", "password123");
  await login("admin", "password123"); // ✅ Secure authentication
}

test();

// ! 🌈 What is a Rainbow Table Attack?

// **  A Rainbow Table Attack is a hacking technique used to crack password hashes by precomputing a massive database of hashed passwords and their corresponding plaintext values. Instead of brute-forcing passwords in real time, attackers use this precomputed table to quickly match hashes to passwords.

// ** 🔍 How Does a Rainbow Table Attack Work?

// 1. Precompute Hashes – The attacker generates a huge list of common passwords and hashes them using a specific hashing algorithm (e.g., MD5, SHA-1).

// Store in a Table – These precomputed password-hash pairs are stored in a "Rainbow Table".

// Compare with Stolen Hashes – If an attacker gains access to a database with hashed passwords, they simply look up each hash in the Rainbow Table to find the original password instantly.

// ** 🛡️ How to Prevent Rainbow Table Attacks

// Use Salted Hashing – Add a random salt to passwords before hashing, making each hash unique.

// Use Strong Hashing Algorithms – Choose bcrypt, Argon2, or PBKDF2, which are slow and resistant to precomputed attacks.

// Use Long and Complex Passwords – Longer, unpredictable passwords make precomputed attacks infeasible.

// ! INJECTION

// ** Involves unathorized code entering the application, causing service disruption or data exposure.

// ** Common form include sql injection, exploting text input fields to run harmful queries

// ! VULNERABLE AND OUTDATED COMPONENTS

// * A vulnerability from patched and outdated libraries leads to vulnerabilities. This is caused by neglecting packages and libraries in the web app

// ! IDENTIFICATION AND AUTHENTICATION FAILURES
