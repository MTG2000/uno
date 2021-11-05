export async function getServers() {}

export async function askJoinServer(serverName, password = "") {
  try {
    // Connect to Real-Time Channel
    return true;
  } catch (error) {
    // Password is wrong, or server full
    return false;
  }
}
