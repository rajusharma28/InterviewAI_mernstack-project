const mongoose  = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/Brijesh";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Sample questions data
const sampleQuestions = {
    technical: [
        {
            text: "What is the difference between let, const, and var in JavaScript?",
            category: "technical",
            difficulty: "medium",
            tags: ["javascript", "programming"]
        },
        {
            text: "Explain the concept of closures in JavaScript.",
            category: "technical",
            difficulty: "hard",
            tags: ["javascript", "programming"]
        },
        {
            text: "How does the 'this' keyword work in JavaScript?",
            category: "technical",
            difficulty: "medium",
            tags: ["javascript", "programming"]
        },
        {
            text: "What are promises in JavaScript and how do they work?",
            category: "technical",
            difficulty: "medium",
            tags: ["javascript", "programming", "async"]
        },
        {
            text: "Explain the difference between synchronous and asynchronous code.",
            category: "technical",
            difficulty: "medium",
            tags: ["programming", "async"]
        },
        {
            text: "What is the event loop in JavaScript?",
            category: "technical",
            difficulty: "hard",
            tags: ["javascript", "programming", "async"]
        },
        {
            text: "Describe the difference between == and === in JavaScript.",
            category: "technical",
            difficulty: "easy",
            tags: ["javascript", "programming"]
        },
        {
            text: "What is the DOM and how do you manipulate it?",
            category: "technical",
            difficulty: "medium",
            tags: ["javascript", "web", "dom"]
        },
        {
            text: "Explain RESTful API architecture.",
            category: "technical",
            difficulty: "medium",
            tags: ["api", "web", "architecture"]
        },
        {
            text: "What is CORS and how does it work?",
            category: "technical",
            difficulty: "medium",
            tags: ["web", "security"]
        }
    ],
    behavioral: [
        {
            text: "Tell me about a time when you had to solve a complex problem.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["problem-solving", "general"]
        },
        {
            text: "Describe a situation where you had to work under pressure to meet a deadline.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["time-management", "stress"]
        },
        {
            text: "Give an example of a time when you had to adapt to a significant change at work.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["adaptability", "change-management"]
        },
        {
            text: "Tell me about a time when you had a conflict with a team member and how you resolved it.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["conflict-resolution", "teamwork"]
        },
        {
            text: "Describe a project you're particularly proud of and your contribution to it.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["achievement", "project-management"]
        },
        {
            text: "How do you handle criticism of your work?",
            category: "behavioral",
            difficulty: "medium",
            tags: ["feedback", "self-improvement"]
        },
        {
            text: "Tell me about a time when you failed at something and what you learned from it.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["failure", "learning"]
        },
        {
            text: "How do you prioritize tasks when you have multiple deadlines?",
            category: "behavioral",
            difficulty: "medium",
            tags: ["time-management", "prioritization"]
        },
        {
            text: "Describe a situation where you had to learn a new skill quickly.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["learning", "adaptability"]
        },
        {
            text: "Tell me about a time when you went above and beyond what was required.",
            category: "behavioral",
            difficulty: "medium",
            tags: ["initiative", "work-ethic"]
        }
    ],
    business: [
        {
            text: "How would you approach entering a new market?",
            category: "business",
            difficulty: "hard",
            tags: ["strategy", "market-analysis"]
        },
        {
            text: "Describe how you would analyze the performance of a marketing campaign.",
            category: "business",
            difficulty: "medium",
            tags: ["marketing", "analytics"]
        },
        {
            text: "How would you handle a situation where a client is unhappy with your service?",
            category: "business",
            difficulty: "medium",
            tags: ["client-management", "conflict-resolution"]
        },
        {
            text: "What metrics would you use to measure the success of a product launch?",
            category: "business",
            difficulty: "medium",
            tags: ["product-management", "analytics"]
        },
        {
            text: "How would you approach pricing a new product?",
            category: "business",
            difficulty: "hard",
            tags: ["pricing", "strategy"]
        },
        {
            text: "Describe your approach to managing a team through a company restructuring.",
            category: "business",
            difficulty: "hard",
            tags: ["management", "change-management"]
        },
        {
            text: "How would you handle a situation where you need to cut costs without affecting quality?",
            category: "business",
            difficulty: "hard",
            tags: ["cost-management", "efficiency"]
        },
        {
            text: "What strategies would you use to increase customer retention?",
            category: "business",
            difficulty: "medium",
            tags: ["customer-retention", "strategy"]
        },
        {
            text: "How would you approach a negotiation with a key supplier?",
            category: "business",
            difficulty: "medium",
            tags: ["negotiation", "supplier-management"]
        },
        {
            text: "Describe how you would create a five-year business plan.",
            category: "business",
            difficulty: "hard",
            tags: ["strategic-planning", "business-development"]
        }
    ],
    healthcare: [
        {
            text: "How would you handle a situation where a patient is dissatisfied with their care?",
            category: "healthcare",
            difficulty: "medium",
            tags: ["patient-care", "conflict-resolution"]
        },
        {
            text: "Describe your approach to maintaining patient confidentiality.",
            category: "healthcare",
            difficulty: "medium",
            tags: ["ethics", "confidentiality"]
        },
        {
            text: "How do you stay updated with the latest medical research and practices?",
            category: "healthcare",
            difficulty: "medium",
            tags: ["professional-development", "research"]
        },
        {
            text: "Describe a situation where you had to make a quick decision in a patient's care.",
            category: "healthcare",
            difficulty: "hard",
            tags: ["decision-making", "critical-thinking"]
        },
        {
            text: "How would you handle a disagreement with a colleague about a patient's treatment plan?",
            category: "healthcare",
            difficulty: "medium",
            tags: ["teamwork", "conflict-resolution"]
        },
        {
            text: "What steps would you take to prevent medication errors?",
            category: "healthcare",
            difficulty: "medium",
            tags: ["patient-safety", "protocols"]
        },
        {
            text: "How would you approach communicating bad news to a patient or their family?",
            category: "healthcare",
            difficulty: "hard",
            tags: ["communication", "empathy"]
        },
        {
            text: "Describe your experience working in a multidisciplinary healthcare team.",
            category: "healthcare",
            difficulty: "medium",
            tags: ["teamwork", "collaboration"]
        },
        {
            text: "How do you manage your time effectively in a fast-paced healthcare environment?",
            category: "healthcare",
            difficulty: "medium",
            tags: ["time-management", "stress-management"]
        },
        {
            text: "What strategies would you use to promote patient compliance with treatment plans?",
            category: "healthcare",
            difficulty: "medium",
            tags: ["patient-education", "communication"]
        }
    ]
};

async function initializeDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        
        const db = client.db("interviewAI");
        
        // Create collections if they don't exist
        await db.createCollection("users");
        await db.createCollection("interviews");
        await db.createCollection("questions");
        
        console.log("Collections created");
        
        // Check if questions collection is empty
        const questionCount = await db.collection("questions").countDocuments();
        
        if (questionCount === 0) {
            console.log("Populating questions collection...");
            
            // Flatten the questions array
            const allQuestions = [
                ...sampleQuestions.technical,
                ...sampleQuestions.behavioral,
                ...sampleQuestions.business,
                ...sampleQuestions.healthcare
            ];
            
            // Insert questions
            await db.collection("questions").insertMany(allQuestions);
            console.log(`${allQuestions.length} questions inserted`);
        } else {
            console.log("Questions collection already populated");
        }
        
        // Create a sample user if none exists
        const userCount = await db.collection("users").countDocuments();
        
        if (userCount === 0) {
            console.log("Creating sample user...");
            
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("password123", salt);
            
            // Create sample user
            const sampleUser = {
                name: "John Doe",
                email: "john@example.com",
                password: hashedPassword,
                createdAt: new Date()
            };
            
            await db.collection("users").insertOne(sampleUser);
            console.log("Sample user created");
        } else {
            console.log("Users collection already has data");
        }
        
        console.log("Database initialization complete");
    } catch (error) {
        console.error("Error initializing database:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Run the initialization
initializeDatabase();