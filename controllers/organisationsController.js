import Organisation from "../models/Organization.js";

// Create Organisation
export const createOrganisation = async (req, res) => {
    try {
        const { organisationName, officialWebsite, notificationPageLink, logo, description } = req.body;

        if (!organisationName) {
            return res.status(400).json({ success: false, message: "Organisation name required" });
        }

        const existing = await Organisation.findOne({ organisationName });

        if (existing) {
            return res.status(400).json({ success: false, message: "Organisation already exists" });
        }

        const org = await Organisation.create({
            organisationName,
            officialWebsite,
            notificationPageLink,
            logo,
            description,
        });

        return res.status(201).json({ success: true, data: org });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getOrganisations = async (req, res) => {
    try {
        const orgs = await Organisation.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: orgs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const updateOrganisation = async (req, res) => {
    try {
        const updated = await Organisation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

     return   res.json({ success: true, data: updated });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteOrganisation = async (req, res) => {
    try {
        await Organisation.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const Organisations = async (req, res) => {
    try {
        const organizations = await Organisation.find()
            .select("organisationName slug")
            .sort({ organisationName: 1 });

        res.json({
            success: true,
            organizations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Create Post Page
// const [organizations, setOrganizations] = useState([]);
// const [formData, setFormData] = useState({
//     title: "",
//     organization: "",
// });


// </ >
//     Post Save
// const postData = {
//     title: formData.title,
//     organization: formData.organization,
// };
// Aur Better Structure

// Post me organization ka naam save karne ke bajay uski _id save karo:

// organization: {
//     type: mongoose.Schema.Types.ObjectId,
//         ref: "Organization",
// }

// Dropdown:

// <option key={org._id} value={org._id}>
//     {org.name}
// </option>

// Post fetch karte waqt:

// Post.find()
//     .populate("organization", "name slug logo");

// Isse agar future me organization ka naam change ho jaye(jaise SSC → Staff Selection Commission), to saari posts automatically update ho jayengi.Ye production - level approach hai.