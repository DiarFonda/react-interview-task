const supabase = require("../createClient");

exports.getJobsites = async (req, res) => {
  const { data, error } = await supabase.from("Jobsites").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getJobsiteById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("Jobsites")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.updateJobsiteStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const { data, error } = await supabase
      .from("Jobsites")
      .update({ status })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

exports.getJobsiteStatusCounts = async (req, res) => {
  try {
    const onHoldCount = await supabase
      .from("Jobsites")
      .select("*", { count: "exact" })
      .eq("status", "ONHOLD");

    const onProgressCount = await supabase
      .from("Jobsites")
      .select("*", { count: "exact" })
      .eq("status", "ONPROGRESS");

    const completedCount = await supabase
      .from("Jobsites")
      .select("*", { count: "exact" })
      .eq("status", "COMPLETED");

    const result = {
      onHold: onHoldCount.count,
      onProgress: onProgressCount.count,
      completed: completedCount.count,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching jobsite status counts:", error);
    res.status(500).json({ error: "Error fetching jobsite status counts" });
  }
};

exports.addJobsite = async (req, res) => {
  const { data, error } = await supabase.from("Jobsites").insert(req.body);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};
