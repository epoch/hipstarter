/* apply a natural box layout model to all elements,
   but allow overriding */
html {
  box-sizing: border-box; }

*, *:before, *:after {
  box-sizing: inherit; }

body {
  margin: 0; }

h1,
h2,
h3,
h4,
p,
blockquote,
figure,
ol,
ul {
  margin: 0;
  padding: 0; }

main {
  display: block; }

h1,
h2,
h3,
h4 {
  font-size: inherit; }

a,
button {
  color: inherit;
  /* dose not inherit be default */
  -webkit-transition: .3s;
  transition: .3s; }

a {
  text-decoration: none; }

img {
  max-width: 100%;
  height: auto;
  border: 0; }
