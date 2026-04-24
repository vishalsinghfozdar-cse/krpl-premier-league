import List "mo:core/List";
import Types "types/registration";
import RegistrationApi "mixins/registration-api";

actor {
  let registrations = List.empty<Types.Registration>();
  var nextIdValue : Nat = 0;
  let nextId = { var value = nextIdValue };

  include RegistrationApi(registrations, nextId);
};
