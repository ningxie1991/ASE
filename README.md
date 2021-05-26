# AScout

This is a project for the advanced software engineering class at UZH. 

Team: Ning Xie - Yasara peiris - Ali Yassine - Yuchen Zhang

# Overview 

AScout is an online web application built to provide travelers an efficient and reliable way of finding their ideal AirBnB rental. This is done by leveraging proximity and public transport data from the Google Maps API, while providing a clear and user friendly user interface. 

Travelers often have an itinerary or a list of places that they want to visit when they travel to a city, however online vacation rental marketplaces like AirBnB do not show information concerning proximity to their itinerary. However, it is often challenging and time-consuming for traveler to find ideal rental locations, especially if they are not very familiar with their destination. This motivated us to create a solution that helps travelers plan their trips, without worrying about the location of their accomodation. Our key functionality would have the user plan their itinerary using the user interface, and then we would be able to suggest neighborhoods that would be the most convenient in terms of proximity, and public transport.


# Technology Stack

### Front End

**ReactJS** was chosen to build an interactive UI. It is preffered over other javascript frameworks because it ensures readability and makes testing easier. In addition, we use the **google-map-react** component, which allows us to render any React component on the Google Map. **HTML5** and **CSS** were also used as they are the de-facto standards.

### Back End

The **Spring boot** Java framework is used to drive the back end of our web application. It is chosen because it eliminates boilerplate configurations and code, reduces overall development time, and thus increases efficiency. In addition, the **Java Client for Google Maps Services** is used to add the functionality of the Google Maps API's to our back end.

### CI/CD

**GitHub Actions** is used to automate the CI/CD pipeline. It is mainly used for the convenience of building, testing, and deploying the code straight from GitHub. In addition, it includes workflow templates, that were useful as a starting point and to save time.

### Containerization

**Docker** is used for the purposes of containarization and deployment of the different microservices. Each microservice is provided with a Dockerfile so that they can be put into seperate containers. GitHub action, **Build and Deploy to GKE** is used to build and package each microservice into a docker container that is pulished to the Google cloud **Container Registry** and deployed to the corresponding kubernetes cluster for dev and prod environments. 

### Testing
The back end testing environment is composed of **JUnit** for writing unit tests and **JaCoCo** for code coverage metrics. The front end testing environment uses the React testing library. In addition, **SonarQube** is used for automatic static code analysis. The testing environments are integrated to run in the GitHub Actions workflows.

 


## How to Run
Each module, namely the ascout-client frontend, browse-service and calculator-service has their individual Dockerfile. There are three environemnts, namley local, development and production. The following instructions are how Ascout is run on each environment.

### local: 
```
git clone https://github.com/ningxie1991/AScout
cd ascout
docker-compose up

# ctrl + c or use the command 'docker-compose down' to exit the application
```
The first build could take a few minutes. After that, the whole application (both frontend and backend) will be running on localhost. AScout website can be accessed at http://localhost:3000

### development/staging:

GitHub Action is used to deploy each module from the repository's develop branch. Latest build in the development/staging environment can be accessed at http://34.65.48.29

### produdction:

GitHub Action is used to deploy each module from the repository's main branch with a release tag. Latest release in the production environment can be accessed at http://ascout.org
      
# How to Use Demo

To use the website go to: <a href="http://ascout.org/"> ascout.org </a> and follow the prompts. When you first access the website select Berlin as the city you wish to visit. Then you will be presented with choices. Click the "Calculate the ideal neighborhood" button, and start entering the destinations you wish to visit. After you are done, click the "find neighborhood" button and you will shortly be presented with the listings from the three most convenient neighborhoods for your itenirary.

Youtube link for the demo: https://youtu.be/KB_mKLFabZE

<p align="center">
  <img width="700" align="center" href="https://youtu.be/KB_mKLFabZE" src="https://github.com/ningxie1991/AScout/blob/develop/images/Wiki/demoascout.gif" alt="demo"/>
</p>



