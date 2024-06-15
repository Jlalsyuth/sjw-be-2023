const supabase = require("../utils/supabaseClient");

const createFaq = async (pertanyaan, user) => {
    let now = new Date();
    now.setHours(now.getHours() + 7);
    let timestamp = now.toISOString();

    const newFaq = {
        nim: user.nim,
        pertanyaan: pertanyaan,
        email: user.email_ub,
        nama: user.nama,
        created_at: timestamp,
    };

    const { error } = await supabase.from("faq").insert(newFaq);

    if (error) {
        throw new Error(`Error inserting new FAQ: ${error.message}`);
    }

    const { data: faqs, error: faqError } = await supabase
        .from("faq")
        .select("*")
        .eq("nim", user.nim)
        .order("id", { ascending: false })
        .limit(1);

    if (faqError) {
        throw new Error(`Error fetching new FAQ: ${faqError.message}`);
    }

    if (!faqs || faqs.length === 0) {
        throw new Error("FAQ creation failed - no FAQ was created");
    }

    return faqs[0];
};

const getAllFaqs = async () => {
    const { data, error } = await supabase.from("faq").select("*");

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(`No FAQs found`);
        }
        throw new Error(`Error fetching all FAQs: ${error.message}`);
    }
    return data;
};

const getFaqsByUserId = async (nim) => {
    const { data, error } = await supabase
        .from("faq")
        .select("*")
        .eq("nim", nim);

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(`No FAQs found for user ${nim}`);
        }
        throw new Error(
            `Error fetching FAQs for user ${nim}: ${error.message}`
        );
    }

    return data;
};

const deleteFaq = async (id) => {
    const { error } = await supabase.from("faq").delete().eq("id", id);

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(`No FAQ found with id ${id}`);
        }
        throw new Error(`Error deleting FAQ with id ${id}: ${error.message}`);
    }
    return true;
};

const updateFaqStatus = async (id, status) => {
    const { data, error } = await supabase
        .from("faq")
        .update({ status: status })
        .eq("id", id);

    if (error) {
        if (error.message.includes("not_found")) {
            throw new Error(`No FAQ found with id ${id}`);
        }
        throw new Error(`Error updating FAQ with id ${id}: ${error.message}`);
    }

    return data;
};

module.exports = {
    createFaq,
    getFaqsByUserId,
    getAllFaqs,
    deleteFaq,
    updateFaqStatus,
};
