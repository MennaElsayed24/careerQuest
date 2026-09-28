import { careerService } from "./services/careers/careerService";

async function testCareerApi() {
  try {
    const careers =
      await careerService.searchCareers(
        "software developer",
      );

    console.log("ESCO CAREERS:");
    console.log(careers);
  } catch (error) {
    console.error(
      "ESCO API ERROR:",
      error,
    );
  }
}

testCareerApi();