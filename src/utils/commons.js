function isPhone(phone){
  let reg = /^[1][34578]\d{9}$/;
  return reg.test(phone)
}

function isCode(code) {
  return code.length === 4;
}


export { isPhone, isCode }
