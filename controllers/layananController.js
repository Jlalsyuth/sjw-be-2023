const layananRepository = require("../repositories/layananRepository");

const createLayanan = async (req, res, createFunction, serviceName) => {
    try {
        const layananData = req.body;
        const layanan = await createFunction(layananData, req.user);
        res.status(201).json({
            message: `${serviceName} created`,
            layanan: layanan,
        });
    } catch (error) {
        res.status(400).json({
            message: `Failed to create ${serviceName}: ${error.message}`,
        });
    }
};

const createLayananULTKSP = async (req, res) => {
    await createLayanan(
        req,
        res,
        layananRepository.createLayananULTKSP,
        "Layanan ULTKSP"
    );
};

const createLayananKonseling = async (req, res) => {
    await createLayanan(
        req,
        res,
        layananRepository.createLayananKonseling,
        "Layanan Konseling"
    );
};

const createLayananKonselingSebaya = async (req, res) => {
    await createLayanan(
        req,
        res,
        layananRepository.createLayananKonselingSebaya,
        "Layanan Konseling Sebaya"
    );
};

const getLayananHistory = async (req, res, historyFunction, serviceName) => {
    try {
        const layananHistory = await historyFunction(req.user.nim);
        res.status(200).json({
            message: `User ${serviceName} layanan history retrieved`,
            layananHistory: layananHistory,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to retrieve ${serviceName} layanan history for user ID ${req.user.nim}: ${error.message}`,
        });
    }
};

const getAllLayananHistory = async (req, res, historyFunction, serviceName) => {
    try {
        const layananHistory = await historyFunction();
        res.status(200).json({
            message: `All ${serviceName} layanan history retrieved`,
            layananHistory: layananHistory,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to retrieve all ${serviceName} layanan history: ${error.message}`,
        });
    }
};

const updateLayanan = async (req, res, updateFunction, serviceName) => {
    const { id } = req.params;
    const { tanggal_konsultasi, status, hasil_layanan, jam } = req.body;

    try {
        const updatedLayanan = await updateFunction(id, {
            tanggal_konsultasi,
            status,
            hasil_layanan,
            jam,
        });

        res.status(200).json({
            message: `${serviceName} layanan updated`,
            layanan: updatedLayanan,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to update ${serviceName} layanan: ${error.message}`,
        });
    }
};

const getULTKSPLayananHistory = async (req, res) => {
    await getLayananHistory(
        req,
        res,
        layananRepository.getULTKSPLayananHistoryForUser,
        "ULTKSP"
    );
};

const getKonselingLayananHistory = async (req, res) => {
    await getLayananHistory(
        req,
        res,
        layananRepository.getKonselingLayananHistoryForUser,
        "Konseling"
    );
};

const getKonselingSebayaLayananHistory = async (req, res) => {
    await getLayananHistory(
        req,
        res,
        layananRepository.getKonselingSebayaLayananHistoryForUser,
        "Konseling Sebaya"
    );
};

const getAllULTKSPLayananHistory = async (req, res) => {
    await getAllLayananHistory(
        req,
        res,
        layananRepository.getAllULTKSPLayananHistory,
        "ULTKSP"
    );
};

const getAllKonselingLayananHistory = async (req, res) => {
    await getAllLayananHistory(
        req,
        res,
        layananRepository.getAllKonselingLayananHistory,
        "Konseling"
    );
};

const getAllKonselingSebayaLayananHistory = async (req, res) => {
    await getAllLayananHistory(
        req,
        res,
        layananRepository.getAllKonselingSebayaLayananHistory,
        "Konseling Sebaya"
    );
};

const updateULTKSPLayanan = async (req, res) => {
    await updateLayanan(
        req,
        res,
        layananRepository.updateULTKSPLayanan,
        "ULTKSP"
    );
};

const updateKonselingLayanan = async (req, res) => {
    await updateLayanan(
        req,
        res,
        layananRepository.updateKonselingLayanan,
        "Konseling"
    );
};

const updateKonselingSebayaLayanan = async (req, res) => {
    await updateLayanan(
        req,
        res,
        layananRepository.updateKonselingSebayaLayanan,
        "Konseling Sebaya"
    );
};

const deleteLayanan = async (req, res, tableName, serviceName) => {
    try {
        const id = req.params.id;
        await layananRepository.deleteLayanan(tableName, id);
        res.status(200).json({ message: `${serviceName} layanan deleted` });
    } catch (error) {
        res.status(500).json({
            message: `Failed to delete ${serviceName} layanan: ${error.message}`,
        });
    }
};

const deleteULTKSPLayanan = async (req, res) => {
    await deleteLayanan(req, res, "layanan_ultksp", "ULTKSP");
};

const deleteKonselingLayanan = async (req, res) => {
    await deleteLayanan(req, res, "layanan_konseling", "Konseling");
};

const deleteKonselingSebayaLayanan = async (req, res) => {
    await deleteLayanan(req, res, "layanan_konseling_sebaya", "Konseling");
};

module.exports = {
    createLayananULTKSP,
    createLayananKonseling,
    createLayananKonselingSebaya,
    getULTKSPLayananHistory,
    getKonselingLayananHistory,
    getKonselingSebayaLayananHistory,
    getAllULTKSPLayananHistory,
    getAllKonselingLayananHistory,
    getAllKonselingSebayaLayananHistory,
    updateULTKSPLayanan,
    updateKonselingLayanan,
    updateKonselingSebayaLayanan,
    deleteULTKSPLayanan,
    deleteKonselingLayanan,
    deleteKonselingSebayaLayanan,
};
