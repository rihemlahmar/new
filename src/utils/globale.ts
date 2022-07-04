
export function pick(obj: any, keys: any) {
    return Object.assign(
      {},
      ...keys.map((key: any) => ({
        [key]: obj[key],
      })),
    );
  }

export function getUserData(data: any) {
    return pick(data, [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "phone",
      "avatar",
    ]);
  }