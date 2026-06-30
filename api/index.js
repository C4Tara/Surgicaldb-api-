// Surgical Instruments Data
const instruments = [
  { id: 1, name: "Scalpel", category: "Cutting", uses: "Making incisions in skin and tissue", sterilization: "Autoclaving" },
  { id: 2, name: "Forceps", category: "Grasping", uses: "Holding and grasping tissue", sterilization: "Autoclaving" },
  { id: 3, name: "Retractor", category: "Retracting", uses: "Holding back tissue to expose surgical site", sterilization: "Autoclaving" },
  { id: 4, name: "Suction Tube", category: "Suction", uses: "Removing blood and fluids from surgical site", sterilization: "Autoclaving" },
  { id: 5, name: "Needle Holder", category: "Suturing", uses: "Holding suture needle during wound closure", sterilization: "Autoclaving" }
];

// Surgical Procedures Data
const procedures = [
  { id: 1, name: "Appendectomy", category: "General Surgery", description: "Surgical removal of the appendix", instruments: ["Scalpel", "Forceps", "Retractor"], duration: "1-2 hours" },
  { id: 2, name: "Cholecystectomy", category: "General Surgery", description: "Surgical removal of the gallbladder", instruments: ["Scalpel", "Forceps", "Suction Tube"], duration: "1-2 hours" },
  { id: 3, name: "Hernia Repair", category: "General Surgery", description: "Surgical repair of a hernia", instruments: ["Scalpel", "Needle Holder", "Retractor"], duration: "1-3 hours" }
];

module.exports = (req, res) => {
  const { url, query } = req;

  // Search endpoint
  if (url.startsWith('/api/search')) {
    const q = (query.q || '').toLowerCase();
    if (!q) return res.status(400).json({ success: false, message: "Please provide a search term using ?q=" });
    return res.json({
      success: true,
      query: q,
      results: {
        instruments: instruments.filter(i => i.name.toLowerCase().includes(q)),
        procedures: procedures.filter(p => p.name.toLowerCase().includes(q))
      }
    });
  }

  // Single instrument
  if (url.startsWith('/api/instruments/')) {
    const id = parseInt(url.split('/').pop());
    const item = instruments.find(i => i.id === id);
    if (!item) return res.status(404).json({ success: false, message: "Instrument not found" });
    return res.json({ success: true, data: item });
  }

  // All instruments
  if (url.startsWith('/api/instruments')) {
    return res.json({ success: true, count: instruments.length, data: instruments });
  }

  // Single procedure
  if (url.startsWith('/api/procedures/')) {
    const id = parseInt(url.split('/').pop());
    const item = procedures.find(i => i.id === id);
    if (!item) return res.status(404).json({ success: false, message: "Procedure not found" });
    return res.json({ success: true, data: item });
  }

  // All procedures
  if (url.startsWith('/api/procedures')) {
    return res.json({ success: true, count: procedures.length, data: procedures });
  }

  // Welcome route
  return res.json({
    message: "Welcome to SurgicalDB API!",
    version: "1.0",
    endpoints: ["/api/instruments", "/api/procedures", "/api/search?q="]
  });
};
