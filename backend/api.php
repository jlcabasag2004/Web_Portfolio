<?php
// PHP API for MySQL (XAMPP alternative)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'portfolio_db';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Routes
switch ($path) {
    case '/api/projects':
        if ($method === 'GET') {
            $result = $conn->query("SELECT * FROM projects ORDER BY created_at DESC");
            $projects = [];
            while ($row = $result->fetch_assoc()) {
                $row['tech_stack'] = json_decode($row['tech_stack'], true);
                $projects[] = $row;
            }
            echo json_encode($projects);
        }
        break;
        
    case '/api/certificates':
        if ($method === 'GET') {
            $result = $conn->query("SELECT * FROM certificates ORDER BY created_at DESC");
            $certificates = [];
            while ($row = $result->fetch_assoc()) {
                $certificates[] = $row;
            }
            echo json_encode($certificates);
        }
        break;
        
    case '/api/comments':
        if ($method === 'GET') {
            $result = $conn->query("SELECT * FROM comments ORDER BY created_at DESC");
            $comments = [];
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }
            echo json_encode($comments);
        } elseif ($method === 'POST') {
            $userName = $_POST['userName'] ?? '';
            $content = $_POST['content'] ?? '';
            
            // Handle file upload
            $profileImageUrl = null;
            if (isset($_FILES['profileImage'])) {
                $uploadDir = 'uploads/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                $fileName = time() . '_' . $_FILES['profileImage']['name'];
                $filePath = $uploadDir . $fileName;
                if (move_uploaded_file($_FILES['profileImage']['tmp_name'], $filePath)) {
                    $profileImageUrl = '/uploads/' . $fileName;
                }
            }
            
            $stmt = $conn->prepare("INSERT INTO comments (user_name, content, profile_image_url) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $userName, $content, $profileImageUrl);
            $stmt->execute();
            
            echo json_encode([
                'id' => $conn->insert_id,
                'userName' => $userName,
                'content' => $content,
                'profileImageUrl' => $profileImageUrl,
                'createdAt' => date('Y-m-d H:i:s')
            ]);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
}

$conn->close();
?>
