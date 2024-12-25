export const parsedUser = (user) => {
  if (!user) return null;

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role || "guest",
    picture: user.picture,
    address: user.address,
    dob: user.dob,
    isActive: user.isActive,
    preferences: user.preferences,
  };
};
