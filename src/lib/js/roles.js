function roles(num) {
    let result;
    switch (num) {
        case 0:
            result = "用户";
            break;
        case 1:
            result = "管理员";
            break;
        case 2:
            result = "站长";
            break;
        case 10:
            result = "SuperMannager";
            break;
        default:
            result = "未设定";
            break;

    }

    return result
}

export default roles