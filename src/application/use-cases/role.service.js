const Role = require("../../domain/entities/role.entity");
const {
  ConflictError,
  NotFoundError,
} = require("../../domain/errors/custom-error");

class RoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async getAllRoles() {
    return this.roleRepository.getAll();
  }

  async getRoleById(id) {
    const role = await this.roleRepository.getById(id);

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    return role;
  }

  async createRole(roleData) {
    const roleEntity = new Role(null, roleData.name);
    const existingRole = await this.roleRepository.getByName(roleData.name);

    if (existingRole) {
      throw new ConflictError("Role already exists");
    }

    return this.roleRepository.create(roleEntity);
  }

  async updateRole(id, roleData) {
    const roleEntity = new Role(id, roleData.name);

    const updatedRole = await this.roleRepository.update(id, roleEntity);

    if (!updatedRole) {
      throw new NotFoundError("Role not found");
    }

    return updatedRole;
  }

  async deleteRole(id) {
    const role = await this.roleRepository.delete(id);

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    return;
  }
}
module.exports = RoleService;
