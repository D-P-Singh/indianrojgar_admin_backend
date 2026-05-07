import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema({

    /* ================= SITE ================= */

    site: {
        siteName: String,
        shortDescription:String,
        siteUrl: String,
        tagline: String,
        logo: String,
        favicon: String,
        defaultAuthor: String,
        language: {
            type: String,
            default: "en"
        },
        timezone: {
            type: String,
            default: "Asia/Kolkata"
        }
    },

    /* ================= BRANDING ================= */

    branding: {
        headerLogo: String,
        footerLogo: String,
        mobileLogo: String,
        primaryColor: String,
        secondaryColor: String
    },

    /* ================= SOCIAL ================= */

    social: {
        facebook: String,
        instagram: String,
        twitter: String,
        youtube: String,
        telegram: String,
        linkedin: String,
        whatsapp: String
    },

    /* ================= CONTACT ================= */

    contact: {
        email: String,
        supportEmail: String,
        phone: String,
        whatsapp: String,
        address: String
    },

    /* ================= SEO ================= */

    seo: {
        metaTitle: String,
        metaDescription: {
            type: String
        },
        metaKeywords: { type: [String], default: [] },
        defaultOgImage: String,
        twitterCard: {
            type: String,
            default: "summary_large_image"
        },
        canonicalUrl: String
    },

    /* ================= ADS ================= */

    ads: {
        headerAd: String,
        sidebarAd: String,
        footerAd: String,
        articleTopAd: String,
        articleBottomAd: String,
        adsenseClientId: String,
        adsenseEnabled: {
            type: Boolean,
            default: false
        }
    },

    /* ================= ANALYTICS ================= */

    analytics: {
        googleAnalyticsId: String,
        googleTagManagerId: String,
        bingVerification: String,
        googleVerification: String
    },

    /* ================= INDEXING ================= */

    indexing: {
        autoIndexing: {
            type: Boolean,
            default: true
        },
        sitemapEnabled: {
            type: Boolean,
            default: true
        },
        rssEnabled: {
            type: Boolean,
            default: true
        }
    },

    /* ================= NOTIFICATIONS ================= */

    notifications: {
        oneSignalAppId: String,
        oneSignalApiKey: String,
        enablePush: {
            type: Boolean,
            default: false
        }
    },

    /* ================= JOB PORTAL SETTINGS ================= */

    jobs: {
        defaultJobType: String,
        defaultLocation: String,
        enableExpiredJobs: {
            type: Boolean,
            default: true
        },
        autoExpireDays: {
            type: Number,
            default: 30
        }
    },

    /* ================= FOOTER ================= */

    footer: {
        footerText: String,
        copyrightText: String
    },

}, { timestamps: true })

export default mongoose.models.Settings ||
    mongoose.model("Settings", SettingsSchema)