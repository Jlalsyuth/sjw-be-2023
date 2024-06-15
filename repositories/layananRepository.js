const supabase = require("../utils/supabaseClient");

const createService = async (
    tableName,
    layananData,
    user,
    duplicateErrorMessage
) => {
    let now = new Date();
    now.setHours(now.getHours() + 7);
    let timestamp = now.toISOString();

    const newData = {
        ...layananData,
        nim: user.nim,
        nama: user.nama,
        prodi: user.prodi,
        angkatan: user.angkatan,
        email: user.email_ub,
        status: "In Progress",
        created_at: timestamp,
    };

    if ("tanggal_konsultasi" in newData) {
        const tanggalKonsultasi = new Date(newData.tanggal_konsultasi);
        if (!isWeekday(tanggalKonsultasi)) {
            throw new Error("HARUS HARI KERJAAAAAAA WOY");
        }
    }

    const { error } = await supabase.from(tableName).insert(newData);
    if (error) {
        if (error.message.includes("duplicate")) {
            throw new Error(duplicateErrorMessage);
        }
        throw new Error(`Error inserting new service: ${error.message}`);
    }

    const insertedLayanan = await getMostRecentLayanan(tableName);
    if (!insertedLayanan) {
        throw new Error(
            `Service creation failed - no service was created for ${tableName}`
        );
    }

    return insertedLayanan;
};

const createLayananULTKSP = async (layananData, user) => {
    return createService(
        "layanan_ultksp",
        layananData,
        user,
        "Duplicate ULTKSP service. This service already exists."
    );
};

const createLayananKonseling = async (layananData, user) => {
    return createService(
        "layanan_konseling",
        layananData,
        user,
        "Duplicate Konseling service. This service already exists."
    );
};

const createLayananKonselingSebaya = async (layananData, user) => {
    return createService(
        "layanan_konseling_sebaya",
        layananData,
        user,
        "Duplicate Konseling Sebaya service. This service already exists."
    );
};

const isWeekday = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5;
};

const getMostRecentLayanan = async (tableName) => {
    const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(`No service found in table ${tableName}`);
        }
        throw new Error(
            `Error fetching most recent service from ${tableName}: ${error.message}`
        );
    }
    return data[0];
};

const getLayananHistoryForUser = async (tableName, nim) => {
    const { error, data } = await supabase
        .from(tableName)
        .select("*")
        .eq("nim", nim);

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(
                `No ${tableName} service history found for user ${nim}`
            );
        }
        throw error;
    }

    return data;
};

const getULTKSPLayananHistoryForUser = async (nim) => {
    return getLayananHistoryForUser("layanan_ultksp", nim);
};

const getKonselingLayananHistoryForUser = async (nim) => {
    return getLayananHistoryForUser("layanan_konseling", nim);
};

const getKonselingSebayaLayananHistoryForUser = async (nim) => {
    return getLayananHistoryForUser("layanan_konseling_sebaya", nim);
};

const getAllLayananHistory = async (tableName) => {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(`No service history found in table ${tableName}`);
        }
        throw error;
    }

    return data;
};

const getAllULTKSPLayananHistory = async () => {
    return getAllLayananHistory("layanan_ultksp");
};

const getAllKonselingLayananHistory = async () => {
    return getAllLayananHistory("layanan_konseling");
};

const getAllKonselingSebayaLayananHistory = async () => {
    return getAllLayananHistory("layanan_konseling_sebaya");
};

const updateLayanan = async (tableName, id, updateData) => {
    const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq("id", id);

    if (error)
        throw new Error(
            `Error updating service with id ${id} in table ${tableName}: ${error.message}`
        );

    const { data, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError) {
        if (fetchError.message.includes("not_found")) {
            throw new Error(
                `No service found with id ${id} in table ${tableName}`
            );
        }
        throw fetchError;
    }

    return data;
};

const updateULTKSPLayanan = async (id, updateData) => {
    return updateLayanan("layanan_ultksp", id, updateData);
};

const updateKonselingLayanan = async (id, updateData) => {
    return updateLayanan("layanan_konseling", id, updateData);
};

const updateKonselingSebayaLayanan = async (id, updateData) => {
    return updateLayanan("layanan_konseling_sebaya", id, updateData);
};

const deleteLayanan = async (tableName, id) => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(
                `No service found in table ${tableName} with id ${id}`
            );
        }
        throw new Error(
            `Error deleting service from ${tableName} with id ${id}: ${error.message}`
        );
    }
    return true;
};

module.exports = {
    createLayananULTKSP,
    createLayananKonseling,
    createLayananKonselingSebaya,
    getULTKSPLayananHistoryForUser,
    getKonselingLayananHistoryForUser,
    getKonselingSebayaLayananHistoryForUser,
    getAllULTKSPLayananHistory,
    getAllKonselingSebayaLayananHistory,
    getAllKonselingLayananHistory,
    updateULTKSPLayanan,
    updateKonselingLayanan,
    updateKonselingSebayaLayanan,
    deleteLayanan,
};
