#!/bin/bash

# 检查产出里是不是有本地目录像`node_modules/xxx`这样的路径，有的话说明构建的结果是不通用的

node_modules_leak_count=$(grep -zo "^[^/].*node_modules\/[a-zA-Z]" -r packages/*/config packages/*/dist | wc -l | xargs)
if [ $node_modules_leak_count -gt 0 ]; then
    echo "found $node_modules_leak_count leaking paths in build assets, please fix it"
    exit 2
fi

# 如果产出的配置文件里有`{}`这种空对象，那基本上不可能是源码直接引入的，而是构建出了问题

empty_leak_count=$(grep -E " [a-zA-Z]+: {}" -r packages/*/config | grep -v features | wc -l | xargs)
if [ $empty_leak_count -gt 0 ]; then
    echo "found $empty_leak_count empty object in exported configurations, please fix it"
    exit 2
fi
