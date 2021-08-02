#!/bin/bash

# 检查产出里是不是有本地目录像`node_modules/xxx`这样的路径，有的话说明构建的结果是不通用的

leak_count=$(grep "node_modules\/[a-zA-Z]" -r packages/*/config packages/*/dist | wc -l | xargs)
if [ $leak_count -gt 0 ]; then
    echo "found $leak_count leaking paths in build assets, please fix it"
    exit 2
fi
