// tslint:disable
// this is an auto generated file. This will be overwritten

export const createOrganisation = `mutation CreateOrganisation($input: CreateOrganisationInput!) {
  createOrganisation(input: $input) {
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
export const updateOrganisation = `mutation UpdateOrganisation($input: UpdateOrganisationInput!) {
  updateOrganisation(input: $input) {
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
export const deleteOrganisation = `mutation DeleteOrganisation($input: DeleteOrganisationInput!) {
  deleteOrganisation(input: $input) {
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
export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
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
export const createList = `mutation CreateList($input: CreateListInput!) {
  createList(input: $input) {
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
export const updateList = `mutation UpdateList($input: UpdateListInput!) {
  updateList(input: $input) {
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
export const deleteList = `mutation DeleteList($input: DeleteListInput!) {
  deleteList(input: $input) {
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
export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
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
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
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
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
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
