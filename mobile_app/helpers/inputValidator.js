export default function inputValidator(value, type) {
  switch (type) {
    case "empty":
      if (!value) return "This field can't be empty.";
      return "";
    case "password":
      if (!value) return "Password can't be empty.";
      if (value.length < 5)
        return "Password must be at least 5 characters long.";
      return "";
    case "email":
      const re = /\S+@\S+\.\S+/;
      if (!value) return "Email can't be empty.";
      if (!re.test(value)) return "Ooops! We need a valid email address.";
      return "";
    default:
      return "";
  }
}
