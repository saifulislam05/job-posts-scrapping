const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const jobs = [];

const getJobs = async () => {
  try {
    const response = await axios.get(
      "https://saifulislam05.github.io/html-pages-for-scraping/jobs.html",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    const $ = cheerio.load(response.data);
    $(".card").each((index, elem) => {
      const job = [
        $(elem).find(".title").text(), 
        $(elem).find(".company").text(),
        $(elem).find(".location").text(),
        $(elem).find(".job-type").text(),
        $(elem).find(".posted-date").text(),
        $(elem).find(".description").text(),
      ];
      jobs.push(job);
    });

    const headers = [
      "Title",
      "Company",
      "Location",
      "Job Type",
      "Posted Date",
      "Description",
    ];
    jobs.unshift(headers);

    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet(jobs); 

    
    xlsx.utils.book_append_sheet(workbook, sheet, "jobsData");
    xlsx.writeFile(workbook, "jobs.xlsx");
    console.log("XLSX file created successfully!");
  } catch (error) {
    console.log(error);
  }
};

getJobs();
