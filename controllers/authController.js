const jwt = require("jsonwebtoken");

const showProfile = (req, res) => {
    try {
        const userData = req.user;

        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "User data is not available in the request.",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                nim: userData.nim,
                nama: userData.nama,
                strata: userData.strata,
                fakultas: userData.fakultas,
                jurusan: userData.jurusan,
                prodi: userData.prodi,
                email_ub: userData.email_ub,
                angkatan: userData.angkatan,
                image: userData.image,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error during fetching profile data: " + error.message,
        });
    }
};

module.exports = {
    showProfile,
};
