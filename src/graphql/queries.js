// eslint-disable
// this is an auto generated file. This will be overwritten

export const getOrganisation = `query GetOrganisation($id: ID!) {
  getOrganisation(id: $id) {
    id
    name
    projects {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;

export const listOrganisations = `query ListOrganisations(
  $filter: ModelOrganisationFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrganisations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      projects {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    name
    organisation {
      id
      name
      projects {
        nextToken
      }
    }
    list {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      organisation {
        id
        name
      }
      list {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getList = `query GetList($id: ID!) {
  getList(id: $id) {
    id
    title
    project {
      id
      name
      organisation {
        id
        name
      }
      list {
        nextToken
      }
    }
    Todos {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const listLists = `query ListLists(
  $filter: ModelListFilterInput
  $limit: Int
  $nextToken: String
) {
  listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      project {
        id
        name
      }
      Todos {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    content
    List {
      id
      title
      project {
        id
        name
      }
      Todos {
        nextToken
      }
    }
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      List {
        id
        title
      }
    }
    nextToken
  }
}
`;
