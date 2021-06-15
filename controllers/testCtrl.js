const testCtrl = {
    testServer: (req, res) => {
        try {
            res.json({ msg: "Server is working." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    testAuth: (req, res) => {
        try {
            const user = req.user
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = testCtrl