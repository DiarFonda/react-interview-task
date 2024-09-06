const supabase = require("../createClient");

exports.getCategories = async (req, res) => {
  const { data, error } = await supabase.from("Categories").select("*");
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

exports.addCategory = async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase.from("Categories").insert([{ name }]);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
};
