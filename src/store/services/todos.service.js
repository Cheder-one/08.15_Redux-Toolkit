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
  create: async (title) => {
    const { data } = await httpService.post(todosEndpoint, {
      title,
      completed: false,
    });
    return data;
  },
};

export default todosService;
