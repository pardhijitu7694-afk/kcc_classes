const dashboardMaster = async (req, res) => {
    try {
        return res.send("Welcome to the read mintra.com")
    } catch (error) {
        return res.send(error)
    }
}

const getHomePage = async (req, res) => {
    try {
        return res.render("pages/home", {
            title: "Home",   // 👈 send title
        });
    } catch (error) {
        console.log(error);
        return res.render("pages/error", { title: "Error" });
    }
};


const getAboutPage = async (req, res) => {
    try {
        return res.render("pages/about", {
            title: "About",   // 👈 send title
        });  // ✅ correct path
    } catch (error) {
        console.log(error);
        return res.render("pages/error", { title: "Error" });
    }
};

const getContactPage = async (req, res) => {
    try {
        return res.render("pages/contact", {
            title: "Contact",   // 👈 send title
        });  // ✅ correct path
    } catch (error) {
        console.log(error);
        return res.render("pages/error", { title: "Error" });
    }
};


const getCoursePage = async (req, res) => {
    try {
        return res.render("pages/courses", {
            title: "Courses",   // 👈 send title
        });  // ✅ correct path
    } catch (error) {
        console.log(error);
        return res.render("pages/error", { title: "Error" });
    }
};


const getTeamPage = async (req, res) => {
    try {
        return res.render("pages/team", {
            title: "Team",   // 👈 send title
        });  // ✅ correct path
    } catch (error) {
        console.log(error);
        return res.render("pages/error", { title: "Error" });
    }
}

module.exports = { dashboardMaster, getHomePage, getAboutPage, getContactPage, getCoursePage, getTeamPage };