import httpService from "./http.service";

const todosEndpoint = "/todos";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _limit: 5,
      },
    });
    return data;
  },
};

export default todosService;
