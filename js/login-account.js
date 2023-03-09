import { setLoginAccount } from "./functions/login.js";
import { token } from "./components/variables.js"

setLoginAccount();

if (token) {
  window.location.href = "index.html";
}
