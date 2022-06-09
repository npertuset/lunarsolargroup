Since this is an quick test to test skills, not all features that I would implement for a client have been implemented. Some decisions had to be made to move quick. If this were a project for a client, I would also recommend:

- Integrate VueJS or ReactJS to manage the JS within the theme (also giving  access to ES6). This gives us more functionality and maintainability for the javascript on the front-end. 
- The menu would be managed within Vue or React. 
- I would not use an ajax cart like liquid ajax used in this example - this was used for speed. I would trigger the sidecart by updating state in whatever state management library was being used by the project. I would also hydrate the cart anytime the cart is triggered/displayed. 

- Better 