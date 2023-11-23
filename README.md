# AutoCaptcha

AutoCaptcha is a solution for automating the process of filling in captcha forms based on manifest V3. It allows users to easily set the classname, id, or query selector of captcha-related elements in order to automatically complete the captcha filling process.

Here's how to use AutoCaptcha:

1. Download and install the required dependencies, then build the dist file using the following commands:


```bash
npm install
npm run build
```
2. Import the built dist file into your browser extension. The specific method may vary depending on the browser you are using.
3. Open the browser extension configuration page and enter the unique identifier for the captcha-related element(s): ID, ClassName, or QuerySelector. For example, if the unique identifier is the classname, enter the classname value in the corresponding field to automatically fill in the captcha form.

