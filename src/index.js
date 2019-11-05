import VirtualDom from "./minimal-virtual-dom/index.js";

const vDomApp = ({ hour, minute, second, secondInt }) => {
  const app = {
    tag: "div",
    props: {
      id: "app"
    },
    children: [
      {
        tag: "div",
        props: {
          id: "timer-container",
          style: "margin: 20px; font-size: 75px;"
        },
        children: [
          {
            tag: "div",
            props: {
              id: "hour-text",
              style: "display: inline-block"
            },
            children: [String(hour)]
          },
          {
            tag: "div",
            props: {
              id: "hour-minute-seperator",
              style:
                "display: inline-block; color: " +
                (secondInt % 2 === 0 ? "red" : "blue") +
                ";"
            },
            children: [String(":")]
          },
          {
            tag: "div",
            props: {
              id: "minute-text",
              style: "display: inline-block"
            },
            children: [String(minute)]
          },
          {
            tag: "div",
            props: {
              id: "minute-seconds-seperator",
              style:
                "display: inline-block; color: " +
                (secondInt % 2 === 0 ? "red" : "blue") +
                ";"
            },
            children: [String(":")]
          },
          {
            tag: "div",
            props: {
              id: "seconds-text",
              style: "display: inline-block;"
            },
            children: [String(second)]
          }
        ]
      }
    ]
  };

  if (secondInt % 5 === 0) {
    app.children.push({
      tag: "div",
      props: {
        style: "font-size: 50px; margin-top: 35px"
      },
      children: [String(second + " is divisible by 5")]
    });
  }

  return app;
};

const getTime = () => {
  const date = new Date();
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const secondInt = date.getSeconds();
  const second = ("0" + secondInt).slice(-2);

  return { hour, minute, second, secondInt };
};

VirtualDom.render(vDomApp(getTime()));

setInterval(() => {
  VirtualDom.render(vDomApp(getTime()));
}, 1000);
