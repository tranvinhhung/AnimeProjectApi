
#!/bin/bash

# Thư mục chứa dự án git của bạn
PROJECT_DIR="/e/project/AnimeProjectApi"

# Thay đổi thư mục làm việc đến dự án của bạn
cd "$PROJECT_DIR"
# Sửa đổi nhiều file (thay đổi theo nhu cầu của bạn)
# Ví dụ: Thêm một dòng vào một file
echo "Thêm một dòng mới" >> file1.txt

# Ví dụ: Thay thế nội dung trong một file
sed -i 's/cũ/mới/g' file2.txt

# Ví dụ: Tạo một file mới
echo "Nội dung của file mới" > newfile.txt
# Kiểm tra xem có thay đổi nào không
if git diff-index --quiet HEAD --; then
  echo "No changes to commit."
  exit 0
fi

# Thêm tất cả các thay đổi
git add .

# Tạo commit với thông điệp tự động
COMMIT_MESSAGE="Auto commit on $(date)"
git commit -m "$COMMIT_MESSAGE"

# Push thay đổi lên remote
git push origin main  # Thay 'main' bằng nhánh bạn muốn push nếu cần

echo "Auto commit completed successfully."
