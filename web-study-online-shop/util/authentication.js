function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action); //세션이 저장되기 전에 인증된 페이지에 접근하는 것을 방지
}

function deleteUserAuthSession(req) {
  req.session.uid = null;
  req.session.save();
}

module.exports = {
  createUserSession: createUserSession,
  deleteUserAuthSession: deleteUserAuthSession,
};
