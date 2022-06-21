const knowStatus = (active, email) => {
  let online = false;
  active.forEach((current) => {
    if (current.email === email) {
      online = true;
    }
  });
  return online;
};

const scrollToDown = () => {
  const body = document.querySelector(".body_main");
  body.scrollTop = body.scrollHeight;
};

const isScrolled = () => {
  const body = document.querySelector(".body_main");
  return body.scrollTop + body.clientHeight + 35 >= body.scrollHeight;
};

const updateSeen = (email, messages, id) => {
  let messageP = messages[email];
  for (let i = messageP.length - 1; i >= 0; i--) {
    if (messageP[i]._id === id) {
      messageP[i].seen = true;
      break;
    }
  }
  return { ...messages, [email]: messageP };
};

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const getUnSeenIds = (messages, email) => {
  let messageP = messages[email];
  let ids = [];
  let docs = [];
  for (let i = messageP.length - 1; i >= 0; i--) {
    if (messageP[i].seen === true) {
      break;
    } else {
      if (messageP[i].from === email) {
        ids.push(messageP[i]._id);
        docs.push(document.getElementById(messageP[i]._id));
      }
    }
  }
  return { ids, docs };
};

const updateSeenIds = (ids, docs) => {
  let data = [];
  for (let i = 0; i < docs.length; i++) {
    if (isInViewport(docs[i])) {
      data = ids.filter((id, index) => index >= i);
      break;
    }
  }
  return data;
};

const getNotify = (contacts) => {
  let notify = [];
  Object.entries(contacts).forEach((contact) => {
    if(contact[1].length > 0){
      let isNotify = !contact[1][contact[1]?.length - 1]?.seen;
      if (isNotify) notify.push(contact[0]);
    }
  });
  return notify;
};

module.exports = {
  knowStatus,
  scrollToDown,
  isScrolled,
  updateSeen,
  isInViewport,
  getUnSeenIds,
  updateSeenIds,
  getNotify
};
