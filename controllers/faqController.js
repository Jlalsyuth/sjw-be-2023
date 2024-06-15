const faqRepository = require("../repositories/faqRepository");

const createFaq = async (req, res) => {
    try {
        const newFaq = await faqRepository.createFaq(
            req.body.pertanyaan,
            req.user
        );
        res.status(201).json({ message: "FAQ created", faq: newFaq });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create FAQ: " + error.message,
        });
    }
};

const getAllFaqs = async (req, res) => {
    try {
        const faqs = await faqRepository.getAllFaqs();
        res.status(200).json({ faqs });
    } catch (error) {
        res.status(400).json({
            message: "Failed to retrieve all FAQs: " + error.message,
        });
    }
};

const getFaqsByUser = async (req, res) => {
    try {
        const faqs = await faqRepository.getFaqsByUserId(req.user.nim);
        res.status(200).json({ faqs });
    } catch (error) {
        res.status(400).json({
            message:
                `Failed to retrieve FAQs by user ID ${req.user.nim}: ` +
                error.message,
        });
    }
};

const deleteFaq = async (req, res) => {
    try {
        const id = req.params.id;
        await faqRepository.deleteFaq(id);
        res.status(200).json({ message: "FAQ deleted" });
    } catch (error) {
        res.status(500).json({
            message: `Failed to delete FAQ with ID ${id}: ` + error.message,
        });
    }
};

const updateFaqStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status; 

        await faqRepository.updateFaqStatus(id, status);

        res.status(200).json({ message: "FAQ updated" });
    } catch (error) {
        res.status(500).json({
            message: `Failed to update FAQ with ID ${id}: ` + error.message,
        });
    }
};

module.exports = {
    createFaq,
    getFaqsByUser,
    getAllFaqs,
    deleteFaq,
    updateFaqStatus,
};
