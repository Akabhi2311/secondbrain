export async function getStats() {
  const res = await fetch("http://localhost:8000/stats");

  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }

  return res.json();
}
export async function getFiles() {
  const res = await fetch("http://localhost:8000/files");
  return res.json();
}
export async function generateQuestions(payload: any) {
  const res = await fetch("http://localhost:8000/generate-questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return res.json();
}