import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

function BulkMailer() {

    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [emails, setEmails] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;

            const workbook = XLSX.read(data, {
                type: "binary",
            });

            const sheetName = workbook.SheetNames[0];

            const sheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheet, {
                header: "A",
            });

            console.log(jsonData);

            const emailList = jsonData
                .slice(0)
                .map((row) => row.A);

            setEmails(emailList);
        };

        reader.readAsBinaryString(file);
    };



    const sendMail = async () => {
        if (!subject || !message || emails.length === 0) {
            setStatus("Please fill all fields");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "https://bulk-mail-app-react.onrender.com/sendemail",
                {
                    sub: subject,
                    msg: message,
                    emailList: emails,
                }
            );

            setStatus(response.data.message);
        } catch (error) {
            setStatus("Failed to send emails");
        }

        setLoading(false);
    };



    const getHistory = async () => {
        const response = await axios.get(
            "https://bulk-mail-app-react.onrender.com/history"
        );

        setHistory(response.data);
    };





    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
            <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Bulk Mail App
                </h1>

                {/* Subject */}

                <div className="mb-5">
                    <label className="block mb-2 font-semibold">
                        Subject
                    </label>

                    <input
                        type="text"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border p-3 rounded-lg"
                    />
                </div>

                {/* Message */}

                <div className="mb-5">
                    <label className="block mb-2 font-semibold">
                        Message
                    </label>

                    <textarea
                        rows="6"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border p-3 rounded-lg"
                    />
                </div>

                {/* Upload File */}

                <div className="mb-5">
                    <label className="block mb-2 font-semibold">
                        Upload Excel File
                    </label>

                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="w-full border p-3 rounded-lg"
                    />
                </div>

                {/* Total Emails */}

                <div className="mb-5 p-4 bg-gray-100 rounded-lg border flex justify-between">
                    <span>Total Emails</span>

                    <span className="font-bold">
                        {emails.length}
                    </span>
                </div>

                {/* Email List */}

                <div className="mb-5">
                    <h2 className="font-semibold mb-2">
                        Email List
                    </h2>

                    <div className="border rounded-lg p-3 h-40 overflow-y-auto">
                        {emails.map((email, index) => (
                            <p key={index}>
                                {email}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Send Button */}

                <button
                    onClick={sendMail}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                    {loading ? "Sending..." : "Send Bulk Mail"}
                </button>
                <button
                    onClick={() => navigate("/history")}
                    className="w-full mt-3 bg-green-600 text-white py-3 rounded-lg"
                >
                    View History
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        navigate("/login");
                    }}
                    className="w-full mt-3 bg-red-600 text-white py-3 rounded-lg"
                >
                    Logout
                </button>
                {
                    status && (
                        <p className="mt-4 text-center font-semibold">
                            {status}
                        </p>
                    )
                }
                {history.map((mail) => (
                    <div key={mail._id} className="border p-3 rounded-lg mt-3">
                        <p><strong>Subject:</strong> {mail.subject}</p>
                        <p><strong>Status:</strong> {mail.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BulkMailer;