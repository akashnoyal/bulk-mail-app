import { useEffect, useState } from "react";
import axios from "axios";

function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await axios.get(
                "https://bulk-mail-app-react.onrender.com/history"
            );

            setHistory(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-3xl font-bold text-center mb-8">
                Email History
            </h1>

            <div className="space-y-4">

                {history.map((mail) => (
                    <div
                        key={mail._id}
                        className="bg-white p-5 rounded-lg shadow"
                    >
                        <p>
                            <strong>Subject:</strong> {mail.subject}
                        </p>

                        <p>
                            <strong>Message:</strong> {mail.body}
                        </p>

                        <p>
                            <strong>Total Emails:</strong>{" "}
                            {mail.recipients.length}
                        </p>

                        <p>
                            <strong>Status:</strong> {mail.status}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                                mail.createdAt
                            ).toLocaleString()}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default History;