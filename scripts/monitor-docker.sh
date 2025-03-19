#!/bin/bash

echo "📊 Surveillance des ressources Docker"
docker stats --no-stream
echo ""
echo "📁 Utilisation des volumes:"
docker system df -v