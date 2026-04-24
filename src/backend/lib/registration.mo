import Types "../types/registration";
import List "mo:core/List";

module {
  public func registerTeam(
    registrations : List.List<Types.Registration>,
    nextId : { var value : Nat },
    teamName : Text,
    captainName : Text,
    villageName : Text,
    phone : Text,
    playerCount : Text,
    timestamp : Int,
  ) : Bool {
    let id = nextId.value;
    nextId.value += 1;
    let registration : Types.Registration = {
      id;
      teamName;
      captainName;
      villageName;
      phone;
      playerCount;
      timestamp;
    };
    registrations.add(registration);
    true;
  };

  public func getRegistrations(registrations : List.List<Types.Registration>) : [Types.Registration] {
    registrations.toArray();
  };
};
