import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Project owner
    currentStatus: { 
    type: String, 
    enum: ['available', 'in_progress', 'completed', 'deleted', 'archived'],
    default: "available" 
    },
    // Team Members & Roles
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["admin", "editor", "viewer"], default: "viewer" },
        joinedAt: { type: Date, default: Date.now },
        permissions: { type: [String], default: [] }, // Custom permissions
      },
    ],

    // Task & Workflow Management
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    status: { type: String, enum: ["active", "completed", "archived"], default: "active" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    deadline: { type: Date, required: true },
    progress: { type: Number, min: 0, max: 100, default: 0 },

    // AI-Powered Features
    aiInsights: {
      workloadAnalysis: { type: String, default: "" }, // AI's workload & efficiency suggestions
      recommendedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // AI suggested tasks
      predictedDeadline: { type: Date }, // AI's estimated completion date
      riskAnalysis: { type: String, default: "" }, // AI-generated risk analysis
    },

    // Integration with External Services
    integrations: {
      googleCalendarSync: { type: Boolean, default: false }, // Google Calendar Sync
      driveIntegration: { type: Boolean, default: false }, // Google Drive or OneDrive File Sync
      slackChannel: { type: String, default: "" }, // Slack channel ID for project notifications
    },

    // File Management & Smart Docs
    files: [
      {
        name: String,
        url: String,
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
        aiSummary: { type: String, default: "" }, // AI-generated document summary
      },
    ],

    // Collaboration & Communication
    discussions: [
      {
        message: String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    meetingSummaries: [
      {
        title: String,
        summary: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Performance & Productivity
    timeTracking: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        hoursSpent: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now },
      },
    ],
    productivityScore: { type: Number, default: 0 }, // AI-driven productivity score

    // Gamification & Team Engagement
    badgesEarned: [{ type: String }], // Badges for achieving milestones
    teamMood: { type: String, enum: ["happy", "neutral", "stressed"], default: "neutral" }, // AI sentiment analysis

    // Activity & Change Log
    activityLog: [
      {
        action: String, // e.g., "Added a new task", "Changed project settings"
        timestamp: { type: Date, default: Date.now },
        triggeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

      aiRecommendations: [{
      type: { type: String, enum: ['workload', 'risk', 'performance', 'resource'] },
      priority: { type: String, enum: ['low', 'medium', 'high'] },
      recommendation: String,
      impact: { type: Number, min: 0, max: 100 },
      createdAt: { type: Date, default: Date.now },
      status: { type: String, enum: ['new', 'acknowledged', 'implemented'] }
    }],

    // Auto-Generated Compliance & Security
    complianceReports: [
      {
        reportName: String,
        generatedAt: { type: Date, default: Date.now },
        complianceStatus: { type: String, enum: ["pass", "warning", "fail"], default: "pass" },
      },
    ],

    lastUpdated: { type: Date, default: Date.now },
    starredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who starred this project
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
