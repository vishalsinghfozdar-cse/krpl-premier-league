import Types "../types/registration";
import List "mo:core/List";
import RegistrationLib "../lib/registration";
import Time "mo:core/Time";

mixin (
  registrations : List.List<Types.Registration>,
  nextId : { var value : Nat },
) {
  public func registerTeam(
    teamName : Text,
    captainName : Text,
    villageName : Text,
    phone : Text,
    playerCount : Text,
  ) : async Bool {
    let timestamp = Time.now();
    RegistrationLib.registerTeam(registrations, nextId, teamName, captainName, villageName, phone, playerCount, timestamp);
  };

  public query func getRegistrations() : async [Types.Registration] {
    RegistrationLib.getRegistrations(registrations);
  };
};
