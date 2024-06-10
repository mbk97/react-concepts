Container and presentation patterns


The Container and presentation pattern is a pattern that aims to separate the presentation logic from the business logic in a react code, thereby making it modular, testable, and one that follows the separations of concern principle. Mostly in react applications, there arise cases where we are required to fetch data from a backend/store or to compute a logic and represent the resultant of that computation on a react component. In these cases, the container and presentation pattern shines as it can be used to categorize the components into two namely:

The container component, which acts as the component responsible for the data fetching or computation.


The presentation component, whose job is to render the fetched data or computed value on the UI(user interface).